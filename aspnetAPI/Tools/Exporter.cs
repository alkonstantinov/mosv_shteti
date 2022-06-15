using ClosedXML.Excel;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using DocumentFormat.OpenXml.Wordprocessing;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml;

namespace aspnetAPI.Tools
{
    public class Exporter
    {
        private readonly IEnumerable<IEnumerable<string>> _rows;
        private readonly IEnumerable<string> _header;
        private readonly string _title;
        public Exporter(IEnumerable<IEnumerable<string>> rows, IEnumerable<string> header, string title)
        {
            _rows = rows;
            _header = header;
            _title = title;
        }

        public byte[] Export(string fileType)
        {
            switch (fileType)
            {
                case "excel": return ExportExcel();
                case "csv": return ExportCSV();
                case "html": return ExportHTML();
                case "xhtml": return ExportHTML("docx");
                case "word": return CreateWordprocessingDocument();
                default: return null;
            }
        }

        public byte[] ExportHTML(string ft = "doc")
        {
            StringBuilder text = new StringBuilder();
            text.AppendLine("<html><head><style>");

            string style = "";
            style += "table, thead, tbody, th, tr, td { border: 1px solid #6c757d; border-collapse: collapse } ";
            style += "table:not([cellpadding]) td, table:not([cellpadding]) th { padding: 0.4rem; } ";
            style += "table tr { vertical-align: top; }";

            text.AppendLine(style);
            text.AppendLine("</style></head><body><header><h2>");
            text.AppendLine(_title);
            text.AppendLine("</h2>");
            foreach (var h in _header)
            {
                text.AppendLine(String.Join("<h4>", h, "</h4>"));
            }
            text.AppendLine("</header><main>");
            foreach (var l in _rows)
            {
                text.AppendLine("<div>");
                foreach (var v in l)
                {
                    text.AppendLine(String.Join("<div>", v, "</div>"));
                }
                text.AppendLine("</div>");
            }
            text.AppendLine("</main></body></html>");

            if (ft == "doc")
            {
                Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);

                return Encoding.Convert(Encoding.UTF8, Encoding.GetEncoding(1251), Encoding.UTF8.GetBytes(text.ToString()));
                //return Encoding.ASCII.GetBytes(text.ToString());
            }
            else
            {
                MainDocumentPart mainPart;
                AlternativeFormatImportPart chunk;
                AltChunk altChunk;

                string altChunkID = "AltChunkId1";

                var fnm = Path.GetTempFileName();

                using (WordprocessingDocument myDoc = WordprocessingDocument.Create(fnm, WordprocessingDocumentType.Document))
                {
                    mainPart = myDoc.MainDocumentPart;

                    if (mainPart == null)
                    {
                        mainPart = myDoc.AddMainDocumentPart();
                        new Document(new Body()).Save(mainPart);
                    }

                    chunk = mainPart.AddAlternativeFormatImportPart(AlternativeFormatImportPartType.Xhtml, altChunkID);

                    using (Stream chunkStream = chunk.GetStream(FileMode.Create, FileAccess.Write))
                    {
                        using (StreamWriter stringStream = new StreamWriter(chunkStream))
                        {
                            stringStream.Write(@text);
                        }
                    }

                    altChunk = new AltChunk();
                    altChunk.Id = altChunkID;
                    mainPart.Document.Body.InsertAt(altChunk, 0); // Of, AltChunk)[altChunk, 0];
                    mainPart.Document.Save();
                }

                // if ms instead of fnm =>  return GetFileAsBytes(ms)
                var bytes = File.ReadAllBytes(fnm);
                File.Delete(fnm);
                return bytes;
            }
        }

        public byte[] CreateWordprocessingDocument()
        {
            // Create a document by supplying the filepath. 
            var fnm = Path.GetTempFileName();
            using (WordprocessingDocument wordDocument =
                WordprocessingDocument.Create(fnm, WordprocessingDocumentType.Document))
            {
                // Add a main document part. 
                MainDocumentPart mainPart = wordDocument.AddMainDocumentPart();

                // Create the document structure and add a title.
                mainPart.Document = new Document();
                Body body = mainPart.Document.AppendChild(new Body());
                Paragraph para = body.AppendChild(new Paragraph());
                Run run = para.AppendChild(new Run());
                run.AppendChild(new Text(_title));

                // Create an empty table.
                Table table = new Table();

                // Create a TableProperties object and specify its border information.
                TableProperties tblProp = new TableProperties(
                    new TableBorders(
                        new TopBorder() { Val = new EnumValue<BorderValues>(BorderValues.BasicThinLines), Size = 16 },
                        new BottomBorder() { Val = new EnumValue<BorderValues>(BorderValues.BasicThinLines), Size = 16 },
                        new LeftBorder() { Val = new EnumValue<BorderValues>(BorderValues.BasicThinLines), Size = 16 },
                        new RightBorder() { Val = new EnumValue<BorderValues>(BorderValues.BasicThinLines), Size = 16 },
                        new InsideHorizontalBorder() { Val = new EnumValue<BorderValues>(BorderValues.BasicThinLines), Size = 10 },
                        new InsideVerticalBorder() { Val = new EnumValue<BorderValues>(BorderValues.BasicThinLines), Size = 10 }
                    )
                );
                // Append the TableProperties object to the empty table.
                table.AppendChild<TableProperties>(tblProp);

                // Create a header row.
                TableRow tr = new TableRow();
                foreach (var h in _header)
                {
                    // Create a cell.
                    TableCell tc = new TableCell();
                    // Specify the table cell content.
                    tc.Append(new Paragraph(new Run(new Text(h))));

                    // Append the table cell to the table row.
                    tr.Append(tc);
                }
                table.Append(tr);

                foreach (var l in _rows)
                {
                    TableRow trData = new TableRow();
                    foreach (var v in l)
                    {
                        TableCell tc = new TableCell();
                        tc.Append(new Paragraph(new Run(new Text(v))));
                        trData.Append(tc);
                    }
                    table.Append(trData);
                }

                body.Append(table);
            }
            var bytes = File.ReadAllBytes(fnm);
            File.Delete(fnm);
            return bytes;
        }

        public byte[] ExportCSV()
        {
            StringBuilder text = new StringBuilder();
            string delimiter = ";";
            text.AppendLine(String.Join(delimiter, _header.ToArray()));
            foreach (var l in _rows)
            {
                text.AppendLine(String.Join(delimiter, l.ToArray()));
            }


            Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);

            return Encoding.Convert(Encoding.UTF8, Encoding.GetEncoding(1251), Encoding.UTF8.GetBytes(text.ToString()));
        }

        public byte[] ExportExcel()
        {
            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("Export");


                for (int cellNo = 0; cellNo < _header.Count(); cellNo++)
                {

                    worksheet.Cell(1, cellNo + 1).Value = _header.ToArray()[cellNo];
                    int rowNo = 2;
                    foreach (var d in _rows)
                    {
                        worksheet.Cell(rowNo, cellNo + 1).Value = d.ToArray()[cellNo];
                        rowNo++;
                    }
                }

                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);

                    var content = stream.ToArray();

                    return content;
                }
            }
        }
    }
}

using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text;

namespace aspnetBO.MainTable
{
    public class MainTable: BaseObject
    {
        public int MainTableId { get; set; }
        public bool isDamage { get; set; }
        public JToken DamageList { get; set; }
        public DateTimeOffset AppearanceDate { get; set; }
        public DateTimeOffset ProcedureDate { get; set; }
        public int ActivityTypeId { get; set; }
        public string Applicant { get; set; }
        public int KidId { get; set; }
        public JToken CourtCases { get; set; }
        public JToken PreventResultsList { get; set; }
        public JToken RemovalResultsList { get; set; }
        public DateTimeOffset EndDate { get; set; }
        public decimal PaidCosts { get; set; }
        public decimal ReimbursedCosts { get; set; }
        public decimal UnpaidCosts { get; set; }
        public bool PaymentSourceOperator { get; set; }
        public string PaymentSource { get; set; }
        public JToken FinancialAssurance { get; set; }
        public decimal AdministativeCosts { get; set; }
        public string Other { get; set; }
    }
}

using aspnetBO.MainTable;
using System.Collections.Generic;

namespace aspnetDAL
{
    public interface IMainRepo
    {
        List<MainTable> DamageGetAll(int startIndex, int count);
        int GetRecordsCount(bool isDamage);
        List<MainTable> MainTableGetAll(int startIndex, int count, bool isDeleted);
        MainTable MainTableGetById(int mainTableId);
        int MainTableInsert(MainTable mt);
        void MainTableUpdate(MainTable mt);
        List<MainTable> MenaceGetAll(int startIndex, int count);
    }
}
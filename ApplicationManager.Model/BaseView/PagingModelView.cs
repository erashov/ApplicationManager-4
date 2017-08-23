using System.Collections.Generic;

namespace ApplicationManager.Model.BaseView
{
    public class PagingModelView<T>
    {
        public IEnumerable<T> Items;

        public int Total_Count;
    }
}

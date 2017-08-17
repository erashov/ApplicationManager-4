using System.Collections.Generic;

namespace ApplicationManager.Model.View
{
    public class PagingModelView<T>
    {
        public IEnumerable<T> Items;

        public int Total_Count;
    }
}

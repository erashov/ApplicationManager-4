using System.Linq;

namespace ApplicationManager.Repository
{
    public interface IBaseRepository<T>
    {
        IQueryable<T> Find();

        IQueryable<T> FindPage(int page, int pageSize);

        T FindById(int id);

        T Add(T entity);

        T Update(T entity);

        T Remove(T entity);
    }
}
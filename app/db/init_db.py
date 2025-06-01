from app.db.session import engine, Base
from app.models import character

def init_db():
    Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    init_db()
    print("База данных и таблицы созданы")
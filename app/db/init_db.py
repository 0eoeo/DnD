from app.db.session import engine
from app.models import user, character

def init():
    user.Base.metadata.create_all(bind=engine)
    character.Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    init()
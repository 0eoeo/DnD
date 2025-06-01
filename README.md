llama_dungeon_backend/
├── app/
│   ├── api/                # Роуты FastAPI
│   │   ├── v1/
│   │   │   ├── character.py        # Регистрация и управление персонажем
│   │   │   ├── chat.py             # Многопользовательский чат
│   │   │   ├── actions.py          # Действия игрока
│   │   │   ├── game.py             # Общие игровые события
│   │   │   ├── combat.py           # Боевая система
│   │   │   ├── dice.py             # Броски кубиков
│   │   │   └── settings.py         # Игровые настройки
│   ├── core/
│   │   ├── config.py        # Настройки окружения (dotenv, глобальные конфиги)
│   │   ├── llama_engine.py  # Работа с нейросетью LLaMA
│   │   └── security.py      # JWT, OAuth2 и др.
│   ├── models/
│   │   ├── character.py     # SQLAlchemy-модель персонажа
│   │   ├── user.py          # Пользователь
│   │   └── game_state.py    # Состояние игры
│   ├── schemas/
│   │   ├── character.py     # Pydantic-схемы персонажа
│   │   ├── chat.py          # Сообщения и действия
│   │   └── game.py
│   ├── services/
│   │   ├── character.py     # Логика регистрации/загрузки
│   │   ├── combat.py        # Обработка боёв
│   │   ├── dice.py          # Генерация бросков
│   │   └── llama.py         # Обёртка для общения с LLaMA
│   ├── db/
│   │   ├── session.py       # Создание сессий SQLAlchemy
│   │   └── init_db.py       # Инициализация базы
│   └── main.py              # Точка входа FastAPI
├── tests/
│   ├── test_character.py
│   ├── test_chat.py
│   └── ...
├── .env                     # Настройки окружения
├── requirements.txt
└── README.md

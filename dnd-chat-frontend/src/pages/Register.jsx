import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
    character: {
      name: '',
      gender: '',
      class_name: ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in form.character) {
      setForm({
        ...form,
        character: {
          ...form.character,
          [name]: value
        }
      });
    } else {
      setForm({
        ...form,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/v1/character/register', form);
      // Обработка успешной регистрации
      console.log('Registration successful:', response.data);
    } catch (error) {
      // Обработка ошибок
      console.error('Registration error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" value={form.username} onChange={handleChange} placeholder="Имя пользователя" />
      <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Пароль" />
      <input name="name" value={form.character.name} onChange={handleChange} placeholder="Имя персонажа" />
      <select name="gender" value={form.character.gender} onChange={handleChange}>
        <option value="">Выберите пол</option>
        <option value="Мужской">Мужской</option>
        <option value="Женский">Женский</option>
        <option value="Другое">Другое</option>
      </select>
      <select name="class_name" value={form.character.class_name} onChange={handleChange}>
        <option value="">Выберите класс</option>
        <option value="Воин">Воин</option>
        <option value="Маг">Маг</option>
        <option value="Разбойник">Разбойник</option>
        {/* Добавьте другие классы по необходимости */}
      </select>
      <button type="submit">Зарегистрироваться</button>
    </form>
  );
};

export default Register;

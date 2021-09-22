CREATE TABLE STOCKS(
    product_id uuid REFERENCES PRODUCTS (id),
    count integer,
    UNIQUE (product_id)
);

INSERT INTO STOCKS (product_id, count) 
values
((SELECT ID FROM PRODUCTS WHERE title = 'Поднятие уровня в одиночку'), 0),
((SELECT ID FROM PRODUCTS WHERE title = 'Крутой учитель Онидзука'), 307),
((SELECT ID FROM PRODUCTS WHERE title = 'Созданный в бездне'), 32),
((SELECT ID FROM PRODUCTS WHERE title = 'Необъятный океан'), 4),
((SELECT ID FROM PRODUCTS WHERE title = 'Бродяга'), 3),
((SELECT ID FROM PRODUCTS WHERE title = 'Ван Пис'), 561),
((SELECT ID FROM PRODUCTS WHERE title = 'Монстр'), 18),
((SELECT ID FROM PRODUCTS WHERE title = 'Стальной алхимик'), 302),
((SELECT ID FROM PRODUCTS WHERE title = 'Невероятные приключения ДжоДжо'), 120),
((SELECT ID FROM PRODUCTS WHERE title = 'Берсерк'), 0);

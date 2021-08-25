import { Product } from "src/dto/product.dto";

export class ProductsService {
  private products: Product[] = [
    {
      id: '1',
      title: 'Пластырь для похудения пупка',
      description: 'Пластырь для похудения пупка нужная трендовая вещь. Вы можете есть, сколько хотите, но пупок всегда будет в форме благодаря пластырю Slim Patch.',
      price: 10
    },
    {
      id: '2',
      title: 'Плюшевые безопасности',
      description: 'Плюшевые безопасности – это одеяло с подогревом, теплое и уютное название. А главное, что ну очень актуально уже сейчас, когда за окном ноябрьские снега.',
      price: 2
    },
    {
      id: '3',
      title: 'Принцесса кровать',
      description: 'Принцесса кровать для ваших питомцев, такое название хорошо звучит. Продает!',
      price: 100
    },
    {
      id: '4',
      title: 'леди натурального меха',
      description: 'Словосочетание «леди натурального меха» вводит в заблуждение и неоднозначно звучит.',
      price: 45
    },
    {
      id: '5',
      title: 'Две пьесы и кружева',
      description: 'Две пьесы и кружева очень по-чеховски, красиво. Но непонятно, откуда взялись пьесы и почему выдалбливают топ…',
      price: 31
    },
    {
      id: '6',
      title: 'новый пользовательский человек футбол',
      description: 'Можно сказать просто футбольная форма с вашим логотипом, а можно изысканно – новый пользовательский человек футбол. Звучит!',
      price: 228
    },
    {
      id: '7',
      title: 'гитара челюсти',
      description: 'Товар гитара челюсти вызывает ассоциации и воспоминания из одноименного фильма. Но это всего лишь зажим для гитары.',
      price: 210
    },
    {
      id: '8',
      title: 'Сексуальные бедра женщин',
      description: 'Сексуальные бедра женщин тоже теперь доступны. А, еще и вспышка нога!',
      price: 999
    }
  ];

  public async findProductById(id: string): Promise<Product | undefined> {
    return this.products.find((product) => product.id === id);
  }

  public async getAllProducts(): Promise<Product[]> {
    return this.products;
  }
}

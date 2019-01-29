import localForage from 'localforage';

export class Storage {
  isReady: boolean = false;

  private config: LocalForageOptions = {
    name: 'Snake',
    version: 1.0,
    storeName: null
  };

  private storage: LocalForage = localForage;

  constructor(private _name: string) {
    this.config.storeName = _name;
  }

  setItem(key, value): Promise<any> {
    return this.storage.setItem(key, value);
  }

  getItem(key): Promise<any> {
    return this.storage.getItem(key);
  }

  remove(key): Promise<any> {
    return this.storage.removeItem(key);
  }

  keys(): Promise<any> {
    return this.storage.keys();
  }

  all(): Promise<any[]> {
    const store = [];

    return this.storage
      .iterate(value => {
        store.push(value);
      })
      .then(() => store);
  }

  setup(): void {
    this.storage.config(this.config);

    try {
      this.storage
        .ready()
        .then(() => this.storage.setDriver(this.storage.INDEXEDDB))
        .then(() => (this.isReady = true))
        .catch(() => {
          throw Error('Could not initialize storage');
        });
    } catch (e) {
      console.log(e);
    }
  }
}

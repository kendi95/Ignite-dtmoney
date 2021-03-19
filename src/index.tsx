import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import App from './App';

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelance de Web',
          amount: 6000,
          type: 'deposit',
          category: 'Dev',
          created_at: new Date('2021-03-10T10:00:00.000Z')
        },
        {
          id: 2,
          title: 'Aluguel',
          amount: 1100,
          type: 'withdraw',
          category: 'Casa',
          created_at: new Date('2021-03-15T15:40:00.000Z')
        },
      ]
    });
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction');
    });

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);
      return schema.create('transaction', data);
    });
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

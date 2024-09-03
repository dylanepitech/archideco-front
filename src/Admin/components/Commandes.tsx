import React, { useState } from 'react';
import { Loader, Truck, CheckCircle, XCircle } from 'lucide-react';
import Card from './Card';
import Chart from './Chart';

const initialData = [
  { client: 'Dylan le Bourin Oui', email: 'cdy@gmail.com', status: 'Traitement', date: '2024-08-22', id: 1 },
  { client: 'Santan 13', email: 'sant@gmail.com', status: 'Livraison', date: '2024-08-21', id: 2 },
  { client: 'Abou', email: 'lechauve@gmail.com', status: 'Terminé', date: '2024-08-21', id: 3 },
  { client: 'Cdy', email: 'lechinois@gmail.com', status: 'Echec', date: '2024-08-20', id: 4 }
];

const statusOptions = [
  { value: '', label: 'Tous les statuts' },
  { value: 'Traitement', label: 'Traitement' },
  { value: 'Livraison', label: 'Livraison' },
  { value: 'Terminé', label: 'Terminé' },
  { value: 'Echec', label: 'Echec' }
];

const statusIcons: any = {
  Traitement: <Loader className="w-4 h-4 text-slate-500 mr-2" />,
  Livraison: <Truck className="w-4 h-4 text-blue-500 mr-2" />,
  Terminé: <CheckCircle className="w-4 h-4 text-green-500 mr-2" />,
  Echec: <XCircle className="w-4 h-4 text-red-500 mr-2" />
};

export default function Commandes() {
  const [searchName, setSearchName] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchStatus, setSearchStatus] = useState('');

  const filteredData = initialData.filter(item => {
    const matchesNameOrEmail = item.client.toLowerCase().includes(searchName.toLowerCase()) ||
      item.email.toLowerCase().includes(searchName.toLowerCase());
    const matchesDate = searchDate ? item.date === searchDate : true;
    const matchesStatus = searchStatus ? item.status === searchStatus : true;

    return matchesNameOrEmail && matchesDate && matchesStatus;
  });

  return (
    <div className='h-full flex-1 p-4 '>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card src="https://openui.fly.dev/openui/24x24.svg?text=📈" chiffre="15,000 €" text="Ventes de la semaine" style="bg-gradient-to-r from-pink-400 to-pink-600" />
        <Card src="https://openui.fly.dev/openui/24x24.svg?text=📦" chiffre="45,634" text="Commande de la semaine" style="bg-gradient-to-r from-blue-400 to-blue-700" />
        <Card src="https://openui.fly.dev/openui/24x24.svg?text=📈" chiffre="95,741" text="Total des clients" style="bg-gradient-to-r from-green-400 to-green-600" />
      </div>
      <div className="p-6 my-4 bg-card text-card-foreground rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Commandes de la semaine</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Rechercher par nom ou email"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="p-2 border rounded mr-2"
          />
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            className="p-2 border rounded mr-2"
          />
          <select
            value={searchStatus}
            onChange={(e) => setSearchStatus(e.target.value)}
            className="p-2 border rounded"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-muted text-muted-foreground">
              <th className="py-2 px-4 border-b text-left">Client</th>
              <th className="py-2 px-4 border-b text-left">Email</th>
              <th className="py-2 px-4 border-b text-left">Status</th>
              <th className="py-2 px-4 border-b text-left">Date de commande</th>
              <th className="py-2 px-4 border-b text-left">Id client</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map(item => (
              <tr key={item.id} className="hover:bg-muted/20">
                <td className="py-2 px-4 border-b flex items-center">
                  <img className="w-8 h-8 rounded-full mr-2" src="https://s.france24.com/media/display/bdcd987c-7a7c-11ee-a7f3-005056bfb2b6/9f162e5d5b3fcba4f574bc62aed2f608b6a4d40b.jpg" alt="Client Avatar" />
                  {item.client}
                </td>
                <td className="py-2 px-4 border-b">{item.email}</td>
                <td className="py-2 px-4 border-b flex items-center">
                  {statusIcons[item.status]}
                  <span className={`py-1 px-2 rounded-full ${item.status === 'Traitement' ? 'bg-slate-300 text-white' : item.status === 'Livraison' ? 'bg-blue-400 text-white' : item.status === 'Terminé' ? 'bg-green-400 text-white' : 'bg-red-500 text-white'}`}>
                    {item.status}
                  </span>
                </td>
                <td className="py-2 px-4 border-b">{new Intl.DateTimeFormat('fr-FR').format(new Date(item.date))}</td>
                <td className="py-2 px-4 border-b">{item.id}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>
          <Chart />
        </div>
      </div>
    </div>
  );
}

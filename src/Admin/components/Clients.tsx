import { useState } from 'react';
import { BadgeCheck, BadgeX } from 'lucide-react';
import Profile from './Profile';

const initialData = [
  { client: 'Dylan le Bourin Oui', email: 'cdy@gmail.com', status: 'Verified', activity: true, date: '2024-08-22', roles: 'Admin', id: 1 },
  { client: 'Santan 13', email: 'sant@gmail.com', status: 'Unverified', activity: false, roles: 'Admin', date: '2024-08-21', id: 2 },
  { client: 'Abou', email: 'lechauve@gmail.com', status: 'Unverified', activity: true, roles: 'User', date: '2024-08-21', id: 3 },
  { client: 'Cdy', email: 'lechinois@gmail.com', status: 'Verified', activity: false, roles: 'User', date: '2024-08-20', id: 4 }
];

const statusOptions = [
  { value: '', label: 'Tous les statuts' },
  { value: 'Verified', label: 'Vérifié' },
  { value: 'Unverified', label: 'Non vérifié' },
];

const roleOptions = [
  { value: '', label: 'Tous les rôles' },
  { value: 'Admin', label: 'Admin' },
  { value: 'User', label: 'User' },
];

const activityOptions = [
  { value: '', label: 'Toutes les activités' },
  { value: 'true', label: 'Actif' },
  { value: 'false', label: 'Inactif' },
];

const statusIcons: any = {
  Verified: <BadgeCheck className="w-4 h-4 text-green-500 mr-2" />,
  Unverified: <BadgeX className="w-4 h-4 text-red-500 mr-2" />,
};

export default function Clients() {
  const [searchName, setSearchName] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const [searchRole, setSearchRole] = useState('');
  const [searchActivity, setSearchActivity] = useState('');
  const [selectedClient, setSelectedClient] = useState<any>(null); 

  const filteredData = initialData.filter(item => {
    const matchesNameOrEmail = item.client.toLowerCase().includes(searchName.toLowerCase()) ||
      item.email.toLowerCase().includes(searchName.toLowerCase());
    const matchesDate = searchDate ? item.date === searchDate : true;
    const matchesStatus = searchStatus ? item.status === searchStatus : true;
    const matchesRole = searchRole ? item.roles === searchRole : true;
    const matchesActivity = searchActivity ? item.activity.toString() === searchActivity : true;

    return matchesNameOrEmail && matchesDate && matchesStatus && matchesRole && matchesActivity;
  });

  return (
    <div className='h-full flex-1 p-4'>
      {!selectedClient ? ( // Affiche le tableau si aucun client n'est sélectionné
        <div className="p-6 my-4 bg-card text-card-foreground rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Liste des clients</h2>
          <div className="mb-4 flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Rechercher par nom ou email"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="p-2 border rounded w-full sm:w-auto"
            />
            <input
              type="date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              className="p-2 border rounded w-full sm:w-auto"
            />
            <select
              value={searchStatus}
              onChange={(e) => setSearchStatus(e.target.value)}
              className="p-2 border rounded w-full sm:w-auto"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            <select
              value={searchRole}
              onChange={(e) => setSearchRole(e.target.value)}
              className="p-2 border rounded w-full sm:w-auto"
            >
              {roleOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            <select
              value={searchActivity}
              onChange={(e) => setSearchActivity(e.target.value)}
              className="p-2 border rounded w-full sm:w-auto"
            >
              {activityOptions.map(option => (
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
                <th className="py-2 px-4 border-b text-left">Activité</th>
                <th className="py-2 px-4 border-b text-left">Role</th>
                <th className="py-2 px-4 border-b text-left">Date d'inscription</th>
                <th className="py-2 px-4 border-b text-left">Id client</th>
                <th className="py-2 px-4 border-b text-left">Switch role</th>
                <th className="py-2 px-4 border-b text-left">Désactiver</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item:any) => (
                <tr key={item.id} className="hover:bg-muted/20" onClick={() => setSelectedClient(item)}> 
                  <td className="py-2 px-4 border-b flex items-center">
                    <img className="w-8 h-8 rounded-full mr-2" src="https://via.placeholder.com/150" alt="Client Avatar" />
                    {item.client}
                  </td>
                  <td className="py-2 px-4 border-b">{item.email}</td>
                  <td className="py-2 px-4 border-b flex items-center">
                    {statusIcons[item.status]}
                    {item.status}
                  </td>
                  <td className="py-2 px-4 border-b">{item.activity ? "Actif" : "Inactif"}</td>
                  <td className="py-2 px-4 border-b">{item.roles}</td>
                  <td className="py-2 px-4 border-b">{new Intl.DateTimeFormat('fr-FR').format(new Date(item.date))}</td>
                  <td className="py-2 px-4 border-b">{item.id}</td>
                  <td className="py-2 px-4 border-b text-white">{item.roles === "Admin" ?
                    <button className="flex items-center justify-center bg-blue-500 px-2 rounded-full">To user</button>
                    :
                    <button className="flex items-center justify-center bg-green-500 px-2 rounded-full">To admin</button>}
                  </td>
                  <td className="py-2 px-4 border-b text-white">
                    <button className="flex items-center justify-center bg-red-500 px-2 rounded-full">Désactiver</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : ( 
        <Profile client={selectedClient} onBack={() => setSelectedClient(null)} /> 
      )}
    </div>
  );
}

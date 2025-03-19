import { NavLink } from 'react-router-dom';
import { Dumbbell, Home, Coffee, Brain, Calendar } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { id: '/', label: 'Dashboard', icon: Home },
    { id: '/meals', label: 'Meals', icon: Coffee },
    { id: '/meditations', label: 'Meditations', icon: Brain },
    { id: '/programs', label: 'Programs', icon: Calendar },
    { id: '/workouts', label: 'Workouts', icon: Dumbbell },
  ];

  return (
    <aside className="w-64 bg-primary text-white h-screen flex flex-col">
      <div className="p-5 border-b border-neutral-secondary/20">
        <div className="flex items-center gap-3">
          <Dumbbell className="h-8 w-8 text-secondary" />
          <h1 className="text-xl font-bold">FitTrainer Pro</h1>
        </div>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.id}
                className={({ isActive }) => `
                  w-full flex items-center gap-3 p-3 rounded-lg transition-colors
                  ${isActive 
                    ? 'bg-secondary text-primary font-medium' 
                    : 'hover:bg-primary/80'
                  }
                `}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-neutral-secondary/20">
        <div className="flex items-center gap-3 p-3">
          <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-primary font-bold">
            JD
          </div>
          <div>
            <p className="font-medium">John Doe</p>
            <p className="text-xs text-neutral-secondary">Fitness Trainer</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

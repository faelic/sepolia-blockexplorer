import './App.css';
import AppRoutes from './app/routes';
import PageLayout from './components/PageLayout';

function App() {
  return (
    <div className="App">
      <PageLayout>
        <AppRoutes />
      </PageLayout>
    </div>
  );
}

export default App;

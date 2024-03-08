import { useEffect, useState } from 'react';
import './App.css';


function App() {
  const [testPayload, setTestPayload] = useState();

  useEffect(() => {
    fetch('http://localhost:8000/test')
      .then(res => res.json())
      .then(data => setTestPayload(data.message));
  }, []);
  return (
    <div className="App">
      <h1>{testPayload ?? "No Data"}</h1>
    </div>
  );
}

export default App;

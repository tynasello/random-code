import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AnimalClassPage from './pages/AnimalClassPage';
import AnimalPage from './pages/AnimalPage';
import LandingPage from './pages/LandingPage.js';

const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache(),
});

function App() {
    return (
        <div className="App">
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <Switch>
                        <Route exact strict path="/" component={LandingPage} />
                        <Route
                            exact
                            strict
                            path="/animalClass/:animalClassName"
                            component={AnimalClassPage}
                        />
                        <Route
                            exact
                            strict
                            path="/animal/:species"
                            component={AnimalPage}
                        />
                    </Switch>
                </BrowserRouter>
            </ApolloProvider>
        </div>
    );
}

export default App;

import React, { Suspense, lazy } from 'react';

import HeaderComponent from './Header/header.component';
import FooterComponent from './Footer/footer.component';
import RoutesComponent from './Routes/routes.component';
import LoadingComponent from './common/Loading/loading.component';

import 'primereact/resources/themes/md-light-deeppurple/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const MenuComponent = lazy(() => import('./Menu/menu.component'));

function App() {
	return (
		<div className="wrapper">
			<Suspense fallback={<LoadingComponent />}>
				<MenuComponent />
			</Suspense>
			<div id="page-wrap">
				<HeaderComponent />
				<RoutesComponent />
				<FooterComponent />
			</div>
		</div>
	);
}

export default App;

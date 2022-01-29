import React from 'react';

import './footer.component.scss';

function FooterComponent() {
	return (
		<footer className="footer">
			<div className="footer__container">
				<a
					className="footer__github"
					href="https://github.com/NiFroPP/IntexSoft-English-for-kids"
					target="_blank"
					rel="noreferrer">
					© 2022 NiFroPP
				</a>
			</div>
		</footer>
	);
}

export default FooterComponent;

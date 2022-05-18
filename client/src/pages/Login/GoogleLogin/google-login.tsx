import { useRef } from 'react';
// import useScript from '../../../hooks/useScript';
//
// export default function GoogleLogin({
// 	onGoogleSignIn = () => {},
// 	text = 'signin_with'
// }) {
// 	const googleSignInButton = useRef(null);
//
// 	useScript('https://accounts.google.com/gsi/client', () => {
// 		window.google.accounts.id.initialize({
// 			client_id: '410658255266-hagghd75id77t3e15qjumrmcv42vmrrm',
// 			callback: onGoogleSignIn
// 		});
// 		window.google.accounts.id.renderButton(
// 			googleSignInButton.current,
// 			{ theme: 'outline', size: 'large', text, width: '250' } // customization attributes
// 		);
// 	});
//
// 	return <div className="test" ref={googleSignInButton} />;
// }

( function ( mw ) {
	'use strict';
	if ( !navigator.clipboard ) {
		console.error( 'Extension:PreToClip: `navigator.clipboard` not available. HINT: Only works from HTTPS or `localhost` context.' ); // eslint-disable-line no-console
		return;
	}

	document.querySelectorAll( '#content pre' ).forEach( ( pre ) => { // eslint-disable-line mediawiki/no-nodelist-unsupported-methods
		if ( !pre.getAttribute( 'tabindex' ) ) {
			pre.setAttribute( 'tabindex', '0' );
		}

		const tooltip = mw.message( 'pretoclip-button-tooltip' ).text();

		const copyButton = new OO.ui.ButtonWidget( {
			icon: 'copy',
			classes: [ 'pretoclip-copy-button' ],
			tabIndexed: true,
			title: tooltip
		} );

		copyButton.on( 'click', () => {
			const text = pre.innerText.replace( /\u00A0/g, ' ' );
			navigator.clipboard.writeText( text ); // eslint-disable-line compat/compat
			mw.notify( mw.message( 'pretoclip-button-notification-text' ).text() );
		} );

		pre.prepend( copyButton.$element[ 0 ] );
	} );
}( mediaWiki ) );

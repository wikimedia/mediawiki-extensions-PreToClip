( function ( mw ) {
	'use strict';
	if ( !navigator.clipboard ) {
		// eslint-disable-next-line no-console
		console.error( 'Extension:PreToClip: `navigator.clipboard` not available. HINT: Only works from HTTPS or `localhost` context.' );
		return;
	}

	const preElements = document.querySelectorAll( '#content pre' );
	for ( let i = 0; i < preElements.length; i++ ) {
		createPreToClipButton( preElements[ i ] );
	}

	function createPreToClipButton( pre ) {
		if ( !pre.getAttribute( 'tabindex' ) ) {
			pre.setAttribute( 'tabindex', '0' );
		}

		const clipboardText = pre.innerText;
		const tooltip = mw.message( 'pretoclip-button-tooltip' ).text();

		const copyButton = new OO.ui.ButtonWidget( {
			icon: 'copy',
			classes: [ 'pretoclip-copy-button' ],
			tabIndexed: true,
			title: tooltip,
			data: {
				clipboardText: clipboardText
			}
		} );

		copyButton.on( 'click', function () {
			const data = this.getData();
			// eslint-disable-next-line compat/compat
			navigator.clipboard.writeText( data.clipboardText );
			mw.notify( mw.message( 'pretoclip-button-notification-text' ).text() );
		}, [], copyButton );

		pre.prepend( copyButton.$element[ 0 ] );
	}
}( mediaWiki ) );

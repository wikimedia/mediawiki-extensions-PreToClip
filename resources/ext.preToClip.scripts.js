( function ( mw, $ ) {
	'use strict';
	if ( !navigator.clipboard ) {
		// eslint-disable-next-line no-console
		console.error( 'Extension:PreToClip: `navigator.clipboard` not available. HINT: Only works from HTTPS or `localhost` context.' );
		return;
	}
	function createPreToClipButton( pre ) {
		var copyButton = document.createElement( 'button' );

		copyButton.assignedPre = pre;
		copyButton.setAttribute(
			'class',
			'mw-ui-button pretoclip-copy-button'
		);
		copyButton.setAttribute(
			'title',
			mw.message( 'pretoclip-button-tooltip' ).text()
		);
		copyButton.innerText = mw.message( 'pretoclip-button-label' ).text();
		pre.parentNode.insertBefore( copyButton, pre );

		var style =
			'display:none;' +
			'z-index:1000;' +
			'position:relative;' +
			'float:right;' +
			'margin-left: -' + copyButton.offsetWidth + 'px;';
		copyButton.setAttribute( 'style', style );

		pre.preToClipButton = copyButton;
	}

	$( document ).on( 'mouseover', 'pre', function () {
		if ( !this.preToClipButton ) {
			createPreToClipButton( this );
		}
		this.preToClipButton.style.display = 'block';
	} );

	$( document ).on( 'mouseover', '.pretoclip-copy-button', function () {
		this.isMouseOver = true;
	} );

	$( document ).on( 'mouseout', '.pretoclip-copy-button', function () {
		this.isMouseOver = false;
		this.style.display = 'none';
	} );

	$( document ).on( 'mouseout', 'pre', function () {
		var me = this;
		setTimeout( function () {
			if ( me.preToClipButton && !me.preToClipButton.isMouseOver ) {
				me.preToClipButton.style.display = 'none';
			}
		},
		50
		);
	} );

	$( document ).on( 'click', '.pretoclip-copy-button', function () {
		// eslint-disable-next-line compat/compat
		navigator.clipboard.writeText( this.assignedPre.innerText );
		mw.notify( mw.message( 'pretoclip-button-notification-text' ).text() );
	} );

	// eslint-disable-next-line no-jquery/no-global-selector
	if ( $( 'pre' ).length > 0 ) {
		mw.loader.load( [ 'mediawiki.ui.button' ] );
	}
}( mediaWiki, jQuery ) );

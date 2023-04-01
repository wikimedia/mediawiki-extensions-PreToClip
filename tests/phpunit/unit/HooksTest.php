<?php

namespace MediaWiki\Extension\PreToClip\Tests;

use MediaWiki\Extension\PreToClip\Hooks;
use OutputPage;
use Skin;

/**
 * @coversDefaultClass \MediaWiki\Extension\PreToClip\Hooks
 */
class HooksTest extends \MediaWikiUnitTestCase {

	/**
	 * @covers ::onBeforePageDisplay
	 */
	public function testOnBeforePageDisplay() {
		$outputPageMock = $this->getMockBuilder( OutputPage::class )
			->disableOriginalConstructor()
			->getMock();

		$outputPageMock->expects( $this->once() )
			->method( 'addModules' )
			->with( 'ext.preToClip.scripts' );

		$skinMock = $this->getMockBuilder( Skin::class )
			->disableOriginalConstructor()
			->getMock();

		( new Hooks )->onBeforePageDisplay( $outputPageMock, $skinMock );
	}
}

<?php

namespace MediaWiki\Extension\PreToClip\Tests;

use MediaWiki\Extension\PreToClip\Hooks;
use MediaWiki\Output\OutputPage;

/**
 * @coversDefaultClass \MediaWiki\Extension\PreToClip\Hooks
 */
class HooksTest extends \MediaWikiUnitTestCase {

	/**
	 * @covers ::onOutputPageBeforeHTML
	 */
	public function testOnBeforePageDisplay() {
		$outputPageMock = $this->getMockBuilder( OutputPage::class )
			->disableOriginalConstructor()
			->getMock();

		$outputPageMock->expects( $this->once() )
			->method( 'addModules' )
			->with( 'ext.preToClip' );

		$text = 'Some text <pre>test</pre> some text';

		( new Hooks )->onOutputPageBeforeHTML( $outputPageMock, $text );
	}
}

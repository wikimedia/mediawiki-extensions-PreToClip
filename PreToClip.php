<?php
$wgExtensionCredits['other'][] = array (
	'name' => 'PreToClip',
	'version' => '0.1',
	'author' => 'Thomas Candrian, based on the work of Jon Rohan, James M. Greene',
        'url'    => 'https://www.mediawiki.org/wiki/Extension:PreToClip',
	'description' => htmlentities('Adds a copy to clipboard button to every <pre> tag')
);
//
if ( !defined( 'MEDIAWIKI' ) ) {
        die( 'This file is an extension to MediaWiki and thus not a valid entry point.' );
}
//
$ZeroClipboardFilesDir = dirname($_SERVER["SCRIPT_NAME"]).'/extensions/PreToClip/ZeroClipboard';
//
$nlpObj = new PreToClip;
$wgHooks['BeforePageDisplay'][] = array ($nlpObj,'hPreToClip');
class PreToClip {
	var $completed;	
	function PreToClip() {
		$this->completed = false;
	}
	function hPreToClip($out) {		
		if ($this->completed) {			
			return true;
		}		
		global $action;
		if ($action != 'view' and $action != '')
			return true;
		global $wgRequest;
		global $ZeroClipboardFilesDir;
		global $GLOBALS;
		$mBodytext = $out->mBodytext;
		$inhaltende = "";
		if (strpos($mBodytext, "<pre>") !== false) {			
			$inhaltende = utf8_decode($mBodytext);
			preg_match_all("/<pre>(.*)<\/pre>/siU", $inhaltende, $treffer);
			foreach ($treffer[0] as $key => $value) {
				
				$text1 = "<div style=\"text-align:right; margin-bottom:-37px;\"><button id=\"my-button".$key."\" data-clipboard-target=\"preid".$key."\" title=\"Click to copy to clipboard.\">Copy to Clipboard</button></div>\n";
				$text1 .= "<script language=\"JavaScript\">\n";
				$text1 .= "var clip".$key." = new ZeroClipboard( $('#my-button".$key."'));\n";
				$text1 .= "</script>\n";
				$text1 .= "<pre id=\"preid".$key."\">".$treffer[1][$key]."</pre>\n";
				$inhaltende = str_replace($treffer[0][$key], $text1, $inhaltende);
			}			
			$text2 = "<script type=\"text/JavaScript\" src=\"".$ZeroClipboardFilesDir."/ZeroClipboard.min.js\"></script>\n";
			$inhaltende = $text2 . $inhaltende;
		}
		//print_r($inhaltende);
		//die();		
		if ($inhaltende != '') {
			$inhaltende = utf8_encode($inhaltende);
			$out->clearHTML();
			$out->addHTML($inhaltende);
		}
		$this->completed = true;
		return true;
	}
}
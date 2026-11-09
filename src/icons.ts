import asana from '../assets/asana.png';
import facebook from '../assets/facebook.png';
import githubLight from '../assets/github-light.png';
import gitlab from '../assets/gitlab.png';
import googleDocs from '../assets/google-docs.png';
import googleDrive from '../assets/google-drive.png';
import npmjs from '../assets/npmjs.png';
import spreadsheets from '../assets/spreadsheets.png';
import twitter from '../assets/twitter.png';
import youtube from '../assets/youtube.png';

/**
 * Icon file name → data URL. Icons are bundled into main.js because
 * Obsidian installs only main.js, manifest.json and styles.css.
 */
export const ICONS: Readonly<Record<string, string>> = {
	'asana.png': asana,
	'facebook.png': facebook,
	'github-light.png': githubLight,
	'gitlab.png': gitlab,
	'google-docs.png': googleDocs,
	'google-drive.png': googleDrive,
	'npmjs.png': npmjs,
	'spreadsheets.png': spreadsheets,
	'twitter.png': twitter,
	'youtube.png': youtube,
};

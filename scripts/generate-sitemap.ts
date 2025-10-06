import { writeFileSync } from 'fs';
import { join } from 'path';
import { sessions } from '../src/data/sessions';

// Utilise la variable d'environnement SITE_URL ou le domaine par défaut
const SITE_URL = process.env.SITE_URL || 'https://lesnotesdemileva.fr';

// Fonction pour convertir une date française en format ISO
function parseFrenchDateToISO(dateStr: string): string {
  const months: { [key: string]: number } = {
    'janvier': 0, 'février': 1, 'mars': 2, 'avril': 3, 'mai': 4, 'juin': 5,
    'juillet': 6, 'août': 7, 'septembre': 8, 'octobre': 9, 'novembre': 10, 'décembre': 11
  };
  
  const parts = dateStr.split(' ');
  const day = parseInt(parts[0]);
  const month = months[parts[1]];
  const year = parseInt(parts[2]);
  
  const date = new Date(year, month, day);
  return date.toISOString().split('T')[0]; // Format YYYY-MM-DD
}

// Génère les URLs pour toutes les pages
function generateUrls() {
  const urls = [
    {
      loc: `${SITE_URL}/`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: '1.0'
    }
  ];

  // Ajoute une URL pour chaque session
  sessions.forEach(session => {
    urls.push({
      loc: `${SITE_URL}/sessions/${session.id}`,
      lastmod: parseFrenchDateToISO(session.date),
      changefreq: 'monthly',
      priority: '0.8'
    });
  });

  return urls;
}

// Génère le XML de la sitemap
function generateSitemapXML() {
  const urls = generateUrls();
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  urls.forEach(url => {
    xml += '  <url>\n';
    xml += `    <loc>${url.loc}</loc>\n`;
    xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    xml += `    <priority>${url.priority}</priority>\n`;
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  
  return xml;
}

// Écrit la sitemap dans le dossier public
function writeSitemap() {
  const sitemapXML = generateSitemapXML();
  const publicDir = join(process.cwd(), 'public');
  const sitemapPath = join(publicDir, 'sitemap.xml');
  
  try {
    writeFileSync(sitemapPath, sitemapXML, 'utf8');
    console.log(`✅ Sitemap générée avec succès : ${sitemapPath}`);
    console.log(`📊 ${sessions.length + 1} URLs incluses dans la sitemap`);
    console.log(`🌐 Domaine utilisé : ${SITE_URL}`);
  } catch (error) {
    console.error('❌ Erreur lors de la génération de la sitemap :', error);
    process.exit(1);
  }
}

// Exécute la génération
writeSitemap();
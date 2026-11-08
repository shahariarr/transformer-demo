'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import 'leaflet/dist/leaflet.css';
import styles from './ProjectLocationMap.module.css';

// -------------------------------------------------------------
// 17 COMPREHENSIVE PROJECT LOCATIONS ACROSS BANGLADESH
// -------------------------------------------------------------
export const PROJECT_LOCATIONS = [
  {
    id: 1,
    title: 'Electrical Substation Installation',
    scope: '33/11kV Turnkey Substation',
    specs: '2× 20 MVA • SCADA Automated • GIS Switchgear',
    location: 'Tejgaon Industrial Area, Dhaka',
    city: 'Dhaka',
    cat: 'Substations',
    slug: 'electrical-substation-installation',
    lat: 23.7639,
    lng: 90.3889
  },
  {
    id: 2,
    title: 'Metro Station Power Infrastructure',
    scope: 'Urban Transit Electrification',
    specs: 'Dual Redundant Feeds • Traction Auxiliary Substations',
    location: 'Mirpur & Uttara, Dhaka',
    city: 'Dhaka',
    cat: 'Transit Power',
    slug: 'metro-station-power',
    lat: 23.8223,
    lng: 90.3654
  },
  {
    id: 3,
    title: 'Financial District Commercial Substation',
    scope: 'Integrated High-Rise Power Network',
    specs: '2,500 kVA Cast Resin Dry-Type • Low Acoustic Noise',
    location: 'Motijheel C/A, Dhaka',
    city: 'Dhaka',
    cat: 'Commercial',
    slug: 'commercial-building-power-infrastructure',
    lat: 23.7330,
    lng: 90.4172
  },
  {
    id: 4,
    title: 'Gulshan Corporate Tower Power Feed',
    scope: 'Smart Commercial Substation',
    specs: '2,000 kVA Dry-Type Transformer • APFC Bank',
    location: 'Gulshan-2, Dhaka',
    city: 'Dhaka',
    cat: 'Commercial',
    slug: 'commercial-building-power-infrastructure',
    lat: 23.7925,
    lng: 90.4078
  },
  {
    id: 5,
    title: 'Keraniganj Heavy Steel Substation',
    scope: 'Industrial Power Feed & Arc Furnace',
    specs: '10,000 kVA Heavy-Duty Oil-Immersed Transformer',
    location: 'Keraniganj, Dhaka',
    city: 'Dhaka',
    cat: 'Transformers',
    slug: 'industrial-transformer-supply',
    lat: 23.6820,
    lng: 90.3550
  },
  {
    id: 6,
    title: 'Medium-Voltage Switchgear Installation',
    scope: 'Industrial Distribution Hub',
    specs: '11kV Vacuum Breakers • 18 Feeder Panels',
    location: 'Joydebpur, Gazipur',
    city: 'Gazipur',
    cat: 'Switchgear',
    slug: 'medium-voltage-switchgear-installation',
    lat: 24.0023,
    lng: 90.4264
  },
  {
    id: 7,
    title: 'Tongi Industrial Manufacturing Hub',
    scope: 'Plant Load Center Substation',
    specs: '6,000 kVA Oil-Immersed Distribution Unit',
    location: 'Tongi, Gazipur',
    city: 'Gazipur',
    cat: 'Transformers',
    slug: 'industrial-transformer-supply',
    lat: 23.8960,
    lng: 90.4040
  },
  {
    id: 8,
    title: 'Konabari Automated Textile Complex',
    scope: 'Continuous Spinning Mill Power Plant',
    specs: '33/11kV 10 MVA Captive Transformer',
    location: 'Konabari, Gazipur',
    city: 'Gazipur',
    cat: 'Industrial',
    slug: 'textile-industrial-complex-substation',
    lat: 24.0280,
    lng: 90.3340
  },
  {
    id: 9,
    title: 'Textile Industrial Complex Substation',
    scope: 'Captive Spinning Mill Power Plant',
    specs: '11kV Dual Incomer • Vacuum Interrupters • APFC',
    location: 'Kanchpur, Narayanganj',
    city: 'Narayanganj',
    cat: 'Commercial',
    slug: 'textile-industrial-complex-substation',
    lat: 23.7120,
    lng: 90.5280
  },
  {
    id: 10,
    title: 'Adamjee EPZ Industrial Substation',
    scope: 'Export Processing Zone Power Hub',
    specs: '33kV GIS Switchgear & Power Transformers',
    location: 'Adamjee EPZ, Narayanganj',
    city: 'Narayanganj',
    cat: 'Substations',
    slug: 'electrical-substation-installation',
    lat: 23.6700,
    lng: 90.5100
  },
  {
    id: 11,
    title: 'Industrial Transformer Supply',
    scope: 'Heavy Industrial Power Feed',
    specs: '35kV Oil-Immersed 16 MVA • OLTC Automation',
    location: 'Sitakunda, Chattogram',
    city: 'Chattogram',
    cat: 'Transformers',
    slug: 'industrial-transformer-supply',
    lat: 22.6180,
    lng: 91.6620
  },
  {
    id: 12,
    title: 'Chattogram Port Marine Yard MV Feed',
    scope: 'Harbor Cranes & Yard Electrification',
    specs: '11kV Arc-Resistant Switchgear Panels',
    location: 'CEPZ, Chattogram',
    city: 'Chattogram',
    cat: 'Switchgear',
    slug: 'medium-voltage-switchgear-installation',
    lat: 22.2850,
    lng: 91.7850
  },
  {
    id: 13,
    title: 'Commercial Building Power Infrastructure',
    scope: 'Integrated Commercial Hub Substation',
    specs: 'Cast Resin Dry-Type • Low Acoustic Noise • Compact',
    location: 'Osmani Nagar, Sylhet',
    city: 'Sylhet',
    cat: 'Commercial',
    slug: 'commercial-building-power-infrastructure',
    lat: 24.8949,
    lng: 91.8687
  },
  {
    id: 14,
    title: 'Water Treatment Plant Electrical Systems',
    scope: 'Municipal Pumping Infrastructure',
    specs: 'Harmonic Filters • VFD Inverter Feeds • Dual Redundant',
    location: 'Khalishpur, Khulna',
    city: 'Khulna',
    cat: 'Public Infrastructure',
    slug: 'water-treatment-plant-electrical-systems',
    lat: 22.8456,
    lng: 89.5403
  },
  {
    id: 15,
    title: 'Solar PV Grid Substation Interconnection',
    scope: '50 MW Solar Farm Grid Tie',
    specs: '33/132kV Step-Up • Outdoor Switchyard • SCADA',
    location: 'Teknaf, Cox\'s Bazar',
    city: 'Cox\'s Bazar',
    cat: 'Renewable Energy',
    slug: 'solar-pv-grid-substation-interconnection',
    lat: 21.4272,
    lng: 92.0058
  },
  {
    id: 16,
    title: 'Cumilla EPZ Substation Distribution',
    scope: 'Export Manufacturing Substation',
    specs: '33/11kV 16 MVA Substation Unit • Vacuum Breakers',
    location: 'Cumilla EPZ, Cumilla',
    city: 'Cumilla',
    cat: 'Substations',
    slug: 'electrical-substation-installation',
    lat: 23.4607,
    lng: 91.1809
  },
  {
    id: 17,
    title: 'Bogura Agro-Industrial Power Grid',
    scope: 'Continuous Food Processing Feed',
    specs: '4,000 kVA Hermetically Sealed Transformer',
    location: 'Bogura Sadar, Bogura',
    city: 'Bogura',
    cat: 'Transformers',
    slug: 'industrial-transformer-supply',
    lat: 24.8465,
    lng: 89.3777
  }
];

export default function ProjectLocationMap() {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function initializeLeafletMap() {
      if (typeof window === 'undefined' || !mapContainerRef.current) return;

      try {
        const L = (await import('leaflet')).default;

        if (!isMounted || !mapContainerRef.current) return;

        // Prevent duplicate initialization in React StrictMode
        if (mapContainerRef.current._leaflet_id) {
          return;
        }

        // Initialize Map centered on Bangladesh with mouse wheel zoom ENABLED
        const map = L.map(mapContainerRef.current, {
          center: [23.75, 90.38],
          zoom: 7,
          minZoom: 6,
          maxZoom: 17,
          scrollWheelZoom: true,   // Enabled: mouse wheel zooms in and out
          doubleClickZoom: true,   // Enabled: double-click to zoom
          touchZoom: true,         // Enabled: touch pinch to zoom
          zoomControl: true
        });

        mapInstanceRef.current = map;

        // OpenStreetMap Tile Layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Custom DivIcon matching user's reference screenshot: blue circle with white outline & '1'
        const customPinIcon = L.divIcon({
          className: 'custom-map-marker',
          html: `<div style="
            width: 25px;
            height: 25px;
            background-color: #2563eb;
            border: 2px solid #ffffff;
            border-radius: 50%;
            color: #ffffff;
            font-weight: 700;
            font-size: 11px;
            line-height: 21px;
            text-align: center;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
            cursor: pointer;
            transition: transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.18s ease;
            user-select: none;
          ">1</div>`,
          iconSize: [25, 25],
          iconAnchor: [12.5, 12.5],
          popupAnchor: [0, -14]
        });

        // Add 17 Markers
        PROJECT_LOCATIONS.forEach((proj) => {
          const marker = L.marker([proj.lat, proj.lng], { icon: customPinIcon }).addTo(map);

          // Clean, high-contrast popup card
          const popupHtml = `
            <div style="font-family: inherit; min-width: 200px; padding: 2px;">
              <span style="display: inline-block; font-size: 10px; font-weight: 700; text-transform: uppercase; color: #0284c7; background: #e0f2fe; padding: 2px 6px; border-radius: 4px; margin-bottom: 5px;">
                ${proj.cat}
              </span>
              <h4 style="font-size: 13.5px; font-weight: 700; color: #0f172a; margin: 0 0 3px 0; line-height: 1.3;">
                ${proj.title}
              </h4>
              <p style="font-size: 11px; color: #64748b; margin: 0 0 6px 0; display: flex; align-items: center; gap: 4px;">
                📍 ${proj.location}
              </p>
              <div style="font-size: 11px; color: #334155; background: #f8fafc; padding: 5px 8px; border-radius: 6px; border: 1px solid #e2e8f0; margin-bottom: 8px; line-height: 1.4;">
                ${proj.specs}
              </div>
              <a href="/projects/${proj.slug}/" style="display: inline-block; font-size: 11px; font-weight: 700; color: #ffffff; background: #0284c7; padding: 5px 12px; border-radius: 6px; text-decoration: none;">
                View Project Details &rarr;
              </a>
            </div>
          `;

          marker.bindPopup(popupHtml);
        });

        if (isMounted) {
          setIsLoaded(true);
        }
      } catch (err) {
        console.error('Failed to load Leaflet map:', err);
      }
    }

    initializeLeafletMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className={styles.mapWrapper}>
      <div className={styles.mapCard}>
        {/* Header Matching Screenshot 1:1 */}
        <div className={styles.mapHeader}>
          <div className={styles.headerLeft}>
            <div className={styles.iconBox} aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <div className={styles.titleArea}>
              <h2 className={styles.mapTitle}>Project Location Map</h2>
              <p className={styles.mapSubtitle}>
                Geographic distribution of substation projects across Bangladesh. Click markers for details.
              </p>
            </div>
          </div>
          <div className={styles.badgePill}>
            <span>17 Locations</span>
          </div>
        </div>

        {/* Map Viewport Area */}
        <div ref={mapContainerRef} className={styles.mapContainer}>
          {!isLoaded && (
            <div className={styles.mapLoadingFallback}>
              <div className={styles.loadingSpinner}></div>
              <span>Loading Map...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * MedRoute — Routing Engine
 * Haversine distance calculation, capability filtering, and facility ranking.
 */

import facilities from '../data/facilities';
import emergencyTypes from '../data/emergencyTypes';

const EARTH_RADIUS_KM = 6371;

/**
 * Calculate the Haversine distance between two GPS coordinates.
 * @returns {number} Distance in kilometres.
 */
export function haversine(lat1, lng1, lat2, lng2) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_KM * c;
}

/**
 * Estimate travel time based on distance.
 * Uses a simple model: avg 25 km/h for Lagos traffic.
 * @returns {number} Estimated minutes.
 */
export function estimateTravelTime(distanceKm) {
  const avgSpeedKmh = 25;
  return Math.round((distanceKm / avgSpeedKmh) * 60);
}

/**
 * Filter facilities that have ALL the required capabilities for a given emergency type.
 */
export function filterByCapability(allFacilities, emergencyTypeId) {
  const emergency = emergencyTypes.find((e) => e.id === emergencyTypeId);
  if (!emergency) return allFacilities;

  const required = emergency.requiredCapabilities;
  return allFacilities.filter((facility) =>
    required.every((cap) => facility.capabilities.includes(cap))
  );
}

/**
 * Rank facilities by Haversine distance from the user's location.
 * Attaches `distance` (km) and `eta` (minutes) to each facility.
 */
export function rankByDistance(facilityList, userLat, userLng) {
  return facilityList
    .map((facility) => {
      const distance = haversine(userLat, userLng, facility.lat, facility.lng);
      const eta = estimateTravelTime(distance);
      return { ...facility, distance: Math.round(distance * 10) / 10, eta };
    })
    .sort((a, b) => a.distance - b.distance);
}

/**
 * Full routing pipeline: filter → rank → return recommendation + alternatives.
 */
export function getRecommendation(emergencyTypeId, userLat, userLng) {
  const MAX_REASONABLE_DISTANCE_KM = 50;

  const qualified = filterByCapability(facilities, emergencyTypeId);
  const rankedQualified = rankByDistance(qualified, userLat, userLng);
  const rankedAll = rankByDistance([...facilities], userLat, userLng);

  if (rankedQualified.length > 0 && rankedQualified[0].distance <= MAX_REASONABLE_DISTANCE_KM) {
    return {
      recommendation: rankedQualified[0],
      alternatives: rankedQualified.slice(1).filter(f => f.distance <= MAX_REASONABLE_DISTANCE_KM),
      totalQualified: rankedQualified.length,
      outOfRangeFallback: false
    };
  } else {
    if (rankedAll.length === 0) {
      return { recommendation: null, alternatives: [], totalQualified: 0, outOfRangeFallback: false };
    }

    return {
      recommendation: rankedAll[0],
      alternatives: rankedAll.slice(1, 4),
      totalQualified: rankedQualified.length,
      outOfRangeFallback: true
    };
  }
}

/**
 * Get all facilities ranked by distance (no capability filter).
 */
export function getAllFacilitiesRanked(userLat, userLng) {
  return rankByDistance([...facilities], userLat, userLng);
}

/**
 * Generate a Google Maps navigation URL for a destination.
 */
export function getGoogleMapsUrl(destLat, destLng) {
  return `https://www.google.com/maps/dir/?api=1&destination=${destLat},${destLng}&travelmode=driving`;
}

/**
 * Generate a tel: link for phone calling.
 */
export function getPhoneUrl(phone) {
  return `tel:${phone.replace(/\s/g, '')}`;
}

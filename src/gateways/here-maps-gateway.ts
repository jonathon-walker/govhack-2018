import axios from "axios";
import * as config from "config";
import { log } from "../infrastructure/logger";
import { GeocodeResponse } from "../features/routing/geocode-response";
interface HereGeocodeResponse {
  Response: GeocodeResponse;
}
export async function getRouteFromHere(from: string, to: string, mode: string) {
  const url = `https://route.api.here.com/routing/7.2/calculateroute.json`;

  const params = {
    app_id: config.get("here.app"),
    app_code: config.get("here.secret"),
    waypoint0: from,
    waypoint1: to,
    mode,
    representation: "display"
  };
  log.info(`params`, params);
  const result = await axios.get(url, {
    params
  });
  return result.data;
}

export async function geocodeAddress(
  address: string
): Promise<HereGeocodeResponse> {
  log.info(`trying to geocode address ${address}`);
  const url = `https://geocoder.api.here.com/6.2/geocode.json`;
  const params = {
    app_id: config.get("here.app"),
    app_code: config.get("here.secret"),
    searchtext: address
  };

  const result = await axios.get(url, {
    params
  });
  const response = result.data as HereGeocodeResponse;
  return response;
}

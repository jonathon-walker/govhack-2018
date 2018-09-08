import axios from "axios";
import * as config from "config";
import { log } from "../infrastructure/logger";

export async function getRouteFromHere(from: string, to: string, mode: string) {
  const url = `https://route.api.here.com/routing/7.2/calculateroute.json`;

  const params = {
    app_id: config.get("here.app"),
    app_code: config.get("here.secret"),
    waypoint0: from,
    waypoint1: to,
    mode
  };
  log.info(`params`, params);
  const result = await axios.get(url, {
    params
  });
  return result.data;
}

export async function geocodeAddress(address: string) {
  const url = `https://geocoder.api.here.com/6.2/geocode.json?app_id=8wXkwyaiOQ88gVFY0SAL&app_code=zzSC8__n856WUf7mDyeeKQ&searchtext=24+fyall+avenue`;
  const params = {
    app_id: config.get("here.app"),
    app_code: config.get("here.secret"),
    address
  };

  const result = await axios.get(url, {
    params
  });
  return result.data.Response.View;
}

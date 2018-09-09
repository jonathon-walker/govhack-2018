interface MetaInfo {
  Timestamp: Date;
}

interface MatchQuality {
  City: number;
}

interface DisplayPosition {
  Latitude: number;
  Longitude: number;
}

interface NavigationPosition {
  Latitude: number;
  Longitude: number;
}

interface TopLeft {
  Latitude: number;
  Longitude: number;
}

interface BottomRight {
  Latitude: number;
  Longitude: number;
}

interface MapView {
  TopLeft: TopLeft;
  BottomRight: BottomRight;
}

interface AdditionalData {
  value: string;
  key: string;
}

interface Address {
  Label: string;
  Country: string;
  State: string;
  City: string;
  PostalCode: string;
  AdditionalData: AdditionalData[];
}

interface Location {
  LocationId: string;
  LocationType: string;
  DisplayPosition: DisplayPosition;
  NavigationPosition: NavigationPosition[];
  MapView: MapView;
  Address: Address;
}

interface Result {
  Relevance: number;
  MatchLevel: string;
  MatchQuality: MatchQuality;
  Location: Location;
}

interface View {
  _type: string;
  ViewId: number;
  Result: Result[];
}

export interface GeocodeResponse {
  MetaInfo: MetaInfo;
  View: View[];
}

declare module 'react-places-autocomplete' {
  import { Component } from 'react';

  interface Suggestion {
    description: string;
    placeId: string;
    active?: boolean;
  }

  interface PlacesAutocompleteProps {
    value: string;
    onChange: (value: string) => void;
    onSelect: (value: string) => void;
    searchOptions?: {
      componentRestrictions?: {
        country: string;
      };
    };
    children: (props: {
      getInputProps: (options?: {
        placeholder?: string;
        className?: string;
      }) => {
        value: string;
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        onBlur: () => void;
        onFocus: () => void;
        className?: string;
        placeholder?: string;
      };
      suggestions: Suggestion[];
      getSuggestionItemProps: (suggestion: Suggestion) => {
        className?: string;
        onClick?: () => void;
        onMouseEnter?: () => void;
        onMouseLeave?: () => void;
      };
      loading: boolean;
    }) => React.ReactNode;
  }

  export default class PlacesAutocomplete extends Component<PlacesAutocompleteProps> {}
}

interface GeocoderResult {
  address_components: Array<{
    long_name: string;
    short_name: string;
    types: string[];
  }>;
  formatted_address: string;
  geometry: {
    location: {
      lat: () => number;
      lng: () => number;
    };
    viewport?: {
      getNorthEast: () => { lat: () => number; lng: () => number };
      getSouthWest: () => { lat: () => number; lng: () => number };
    };
  };
  place_id: string;
  types: string[];
}

interface GoogleMaps {
  maps: {
    places: {
      Autocomplete: new (input: HTMLInputElement, options?: { componentRestrictions?: { country: string } }) => {
        addListener: (event: string, callback: () => void) => void;
        getPlace: () => {
          geometry?: {
            location: {
              lat: () => number;
              lng: () => number;
            };
          };
        };
      };
    };
    Geocoder: new () => {
      geocode: (
        request: { address?: string; location?: { lat: number; lng: number } },
        callback: (results: GeocoderResult[], status: string) => void
      ) => void;
    };
  };
}

interface Window {
  google: GoogleMaps;
}
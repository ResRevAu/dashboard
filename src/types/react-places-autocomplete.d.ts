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

interface Window {
    google: any;
  };
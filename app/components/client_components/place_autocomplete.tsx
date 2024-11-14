'use client'

import { Input } from "@/components/ui/input";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useRef, useState } from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

interface PlaceAutocompleteProps {
    onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
    field: ControllerRenderProps<FieldValues, "location">
}

const PlaceAutocomplete = ({ onPlaceSelect, field }: PlaceAutocompleteProps) => {
    const [placeAutocomplete, setPlaceAutocomplete] =
        useState<google.maps.places.Autocomplete | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const places = useMapsLibrary('places');

    useEffect(() => {
        if (!places || !inputRef.current) return;

        const options = {
            fields: ['geometry', 'name', 'formatted_address']
        };

        setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
    }, [places]);

    useEffect(() => {
        if (!placeAutocomplete) return;

        placeAutocomplete.addListener('place_changed', () => {
            onPlaceSelect(placeAutocomplete.getPlace());
        });
    }, [onPlaceSelect, placeAutocomplete]);
    useEffect(() => {
        if (!window.google || !inputRef.current) return;

        const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
            fields: ["geometry", "name", "formatted_address"],
        });

        autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            onPlaceSelect(place);
            field.onChange(place.formatted_address); // Set address as value
        });
    }, [onPlaceSelect, field]);

    return (
        <Input ref={inputRef} className="w-96" />
    );
};
export default PlaceAutocomplete;
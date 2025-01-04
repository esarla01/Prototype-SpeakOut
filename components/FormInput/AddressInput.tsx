import React from "react";
import Autocomplete, { ReactGoogleAutocompleteInputProps } from "react-google-autocomplete";

interface AddressInputProps extends ReactGoogleAutocompleteInputProps{
    error?: boolean
}

const base_classes = 'w-full p-1 border border-black rounded'
const error_classes = 'w-full p-1 border border-red-500 rounded  bg-error-icon bg-no-repeat bg-input-error-size bg-input-error-pos'

const AddressInput = React.forwardRef<HTMLInputElement, AddressInputProps>(
    ({ error, ...props }, ref) => {
        return (
            <>
                <Autocomplete
                    apiKey={"AIzaSyAjGaFhqe9naaJH80xyJcpj6eSSbehON50"}
                    placeholder=""
                    options={{
                        componentRestrictions: { country: "us" },
                        types: ["address"],
                        strictBounds: false,
                    }}
                    className={error ? error_classes : base_classes}
                    {...props}
                />
            </>
        );
    });
AddressInput.displayName = 'AddressInput'
export { AddressInput }
export function validateForm(formData: Record<string, string>) {
    let isValid = true;
    let emailFormatError = false;
    const errors: Record<string, boolean> = {};

    for (let key in formData) {
        if (!formData[key]) {
            errors[key] = true;
            isValid = false;
        } else {
            errors[key] = false;
        }
    }

    // Email format provera
    if (formData.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            emailFormatError = true;
            isValid = false;
        }
    }

    return { isValid, errors, emailFormatError };
}
async function bookCab({ city }) {
    
    return {
        bookingId: "CAB12345",
        driver: "Rahul",
        car: "Swift Dzire",
        eta: "5 minutes",
        city
    };
}
export default bookCab;
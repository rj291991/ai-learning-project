async function retry(fn, args, retries = 3, delay = 1000) {

    let lastError;

    for (let attempt = 1; attempt <= retries; attempt++) {

        try {
            return await fn(args);

        } catch (error) {

            lastError = error;

            console.log(
                `Attempt ${attempt} failed: ${error.message}`
            );

            if (attempt < retries) {
                await new Promise(resolve =>
                    setTimeout(resolve, delay)
                );
            }
        }
    }

    throw lastError;
}

export default retry;
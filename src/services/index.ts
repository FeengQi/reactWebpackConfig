export async function changeUsername(username: string): Promise<{ success: boolean }> {
    console.log(username);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: true });
        }, 1000);
    });
}
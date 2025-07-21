


export function getGreetingMessage() {
    const now = new Date();
    const hour = now.getHours();

    let message = '';
    let colorClass = '';
    if (hour >= 5 && hour < 12) {
        message = 'Good Morning ☀️';
        colorClass = 'text-yellow-500';
    } else if (hour >= 12 && hour < 17) {
        message = 'Good Afternoon 🌤️';
        colorClass = 'text-orange-500';
    } else if (hour >= 17 && hour < 21) {
        message = 'Good Evening 🌇';
        colorClass = 'text-purple-600';
    } else {
        message = 'Good Night 🌙';
        colorClass = 'text-blue-800';
    }

    return { message, colorClass };
}
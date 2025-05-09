function TaskProgress(
    {
        percentage
    }
) {
    const getMessage = (percentage) => {
        if (percentage === 0) return "You haven't completed any tasks yet";
        if (percentage < 25) return "Getting started! Keep going!";
        if (percentage < 50) return "You're making progress!";
        if (percentage < 75) return "You're doing great!";
        if (percentage < 100) return "Almost there!";
        return "Congratulations! All tasks completed! 🎉";
    };

    return (
        <div className="w-full md:w-lg text-sm mb-4">
            <div>{getMessage(percentage)}</div>
            <div className="rounded-full h-2 bg-gray-100 my-2">
                <div className="bg-blue-400 h-1.5 rounded-full transition-all" style={{ width: `${percentage}%` }}></div>
            </div>
            <div className="text-gray-400">{Math.floor(percentage)}% of your tasks are completed</div>
        </div>
    )
}

export default TaskProgress
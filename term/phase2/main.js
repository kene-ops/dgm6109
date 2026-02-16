"use strict"

/*
Hypothesis:
As my gym/workout level decreases, my productivity level decreases.

The top-level data structure is an Array of daily observations.
Each observation is represented as an Object.
*/

let observations = [{
    date: "2026-01-23",
    sleepMinutes: 400,
    meditationMinutes: 15,
    meals: 2,
    gym: {
        weightKg: 85,
        reps: 210
    }, // gym workout details
    productivity: {
        tasksCompleted: 3,
        tasksSet: 4,
        remark: 3.75
    } // productivity results
}, // day one observation of sleep, meditation,feeding, workout and productivity

{
    date: "2026-01-24",
    sleepMinutes: 345,
    meditationMinutes: 16,
    meals: 2,
    gym: {
        weightKg: 85,
        reps: 180
    },
    productivity: {
        tasksCompleted: 2,
        tasksSet: 4,
        remark: 2.5
    }
}, // day two observation of sleep, meditation,feeding, workout and productivity

{
    date: "2026-01-26",
    sleepMinutes: 305,
    meditationMinutes: 15,
    meals: 1,
    gym: {
        weightKg: 0,
        reps: 0
    },
    productivity: {
        tasksCompleted: 1,
        tasksSet: 3,
        remark: 1.67
    }
}, // day three observation of sleep, meditation,feeding, workout and productivity

{
    date: "2026-01-27",
    sleepMinutes: 330,
    meditationMinutes: 14,
    meals: 2,
    gym: {
        weightKg: 87,
        reps: 200
    },
    productivity: {
        tasksCompleted: 2,
        tasksSet: 3,
        remark: 3.33
    }
}, // day four observation of sleep, meditation,feeding, workout and productivity

{
    date: "2026-01-28",
    sleepMinutes: 420,
    meditationMinutes: 15,
    meals: 3,
    gym: {
        weightKg: 90,
        reps: 240
    },
    productivity: {
        tasksCompleted: 3,
        tasksSet: 3,
        remark: 5
    }
}, // day five observation of sleep, meditation,feeding, workout and productivity

{
    date: "2026-01-29",
    sleepMinutes: 240,
    meditationMinutes: 18,
    meals: 2,
    gym: {
        weightKg: 0,
        reps: 0
    },
    productivity: {
        tasksCompleted: 3,
        tasksSet: 4,
        remark: 3.75
    }
}, // day six observation of sleep, meditation,feeding, workout and productivity

{
    date: "2026-01-31",
    sleepMinutes: 420,
    meditationMinutes: 15,
    meals: 2,
    gym: {
        weightKg: 82,
        reps: 80
    },
    productivity: {
        tasksCompleted: 2,
        tasksSet: 2,
        remark: 5
    }
}, // day seven observation of sleep, meditation,feeding, workout and productivity

{
    date: "2026-02-02",
    sleepMinutes: 360,
    meditationMinutes: 14,
    meals: 1,
    gym: {
        weightKg: 0,
        reps: 0
    },
    productivity: {
        tasksCompleted: 3,
        tasksSet: 3,
        remark: 5
    }
}, // day eight observation of sleep, meditation,feeding, workout and productivity

{
    date: "2026-02-03",
    sleepMinutes: 300,
    meditationMinutes: 15,
    meals: 2,
    gym: {
        weightKg: 0,
        reps: 0
    },
    productivity: {
        tasksCompleted: 1,
        tasksSet: 4,
        remark: 1.25
    }
}, // day nine observation of sleep, meditation,feeding, workout and productivity

{
    date: "2026-02-04",
    sleepMinutes: 340,
    meditationMinutes: 15,
    meals: 1,
    gym: {
        weightKg: 80,
        reps: 70
    },
    productivity: {
        tasksCompleted: 3,
        tasksSet: 4,
        remark: 3.75
    }
}, // day ten observation of sleep, meditation,feeding, workout and productivity

{
    date: "2026-02-05",
    sleepMinutes: 300,
    meditationMinutes: 10,
    meals: 2,
    gym: {
        weightKg: 85,
        reps: 160
    },
    productivity: {
        tasksCompleted: 1,
        tasksSet: 2,
        remark: 2.5
    }
}, // day eleven observation of sleep, meditation,feeding, workout and productivity

{
    date: "2026-02-06",
    sleepMinutes: 300,
    meditationMinutes: 15,
    meals: 2,
    gym: {
        weightKg: 90,
        reps: 110
    },
    productivity: {
        tasksCompleted: 2,
        tasksSet: 3,
        remark: 3.33
    }
}, // day twelve observation of sleep, meditation,feeding, workout and productivity

{
    date: "2026-02-07",
    sleepMinutes: 360,
    meditationMinutes: 15,
    meals: 2,
    gym: {
        weightKg: 85,
        reps: 120
    },
    productivity: {
        tasksCompleted: 3,
        tasksSet: 3,
        remark: 5
    }
}, // day thirteen observation of sleep, meditation,feeding, workout and productivity

{
    date: "2026-02-09",
    sleepMinutes: 480,
    meditationMinutes: 14,
    meals: 2,
    gym: {
        weightKg: 85,
        reps: 100
    },
    productivity: {
        tasksCompleted: 3,
        tasksSet: 4,
        remark: 3.75
    }
} // day fourteen observation of sleep, meditation,feeding, workout and productivity
]; // list of daily observations

showData(observations);

// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.9;

contract Todo {
    struct Task {
        string task;
        bool isDone;
    }

    mapping (address => Task[]) User;

    function createTask(string memory _task) public {
        User[msg.sender].push(Task({
            task: _task,
            isDone: false
        }));
    }

    function getTask() public view returns (Task[] memory) {
        return User[msg.sender];
    }

    function updateTaskStatus(uint _taskIndex) external {
        if (User[msg.sender][_taskIndex].isDone == true) {
            User[msg.sender][_taskIndex].isDone = false;
        } else if (User[msg.sender][_taskIndex].isDone == false) {
            User[msg.sender][_taskIndex].isDone = true;
        }
    }

    function deleteTask(uint _taskIndex) external {
        delete User[msg.sender][_taskIndex];
    }
}
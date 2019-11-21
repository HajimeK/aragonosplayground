// contracts/CounterApp.sol
pragma solidity 0.4.24;

import "@aragon/os/contracts/apps/AragonApp.sol";

// inherit from the Aragon app smart contract
contract CounterApp is AragonApp {
    // Events
    event Increment(address entity);
    event Decrement(address entity);

    // define the roles that you want your app to have.
    // A role can be assigned to other apps or people
    // and those entities will have access to methods guarded by that role.
    bytes32 constant public INCREMENT_ROLE = keccak256("INCREMENT_ROLE");
    bytes32 constant public DECREMENT_ROLE = keccak256("DECREMENT_ROLE");

    // State
    int public value;

    function initialize() onlyInit public {
        initialized();
    }


/**
     * @notice Increment the counter by 1
     */
    function increment() auth(INCREMENT_ROLE) external {
        value += 1;
        emit Increment(msg.sender);
    }

/**
     * @notice Decrement the counter by 1
     */
    function decrement() auth(DECREMENT_ROLE) external {
        value -= 1;
        emit Decrement(msg.sender);
    }
}
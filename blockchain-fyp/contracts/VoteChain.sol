pragma solidity >=0.5.0 <0.6.0;

contract VoteChain {
    address public manager;
    struct Voter {
        uint256 voterid;
        string partyname;
        bool voted;
    }
    struct Party {
        string partyname;
        uint256 totalvote;
    }
    mapping(uint256 => Voter) votersArray;
    mapping(string => Party) partyArray;

    event voteCasted(uint256 voterId);

    constructor() public {
        manager = msg.sender;

        partyArray["PTI"] = Party("PTI", 0);
        partyArray["PMLN"] = Party("PMLN", 0);
        partyArray["PPP"] = Party("PPP", 0);
    }

    modifier restricted() {
        require(manager == msg.sender, "only manager can add");
        _;
    }

    function casteVote(uint256 voterId, string memory partyname)
        public
        restricted
    {
        require(votersArray[voterId].voted != true, "Vote Already Casted");
        votersArray[voterId] = Voter(voterId, partyname, true);
        partyArray[partyname].totalvote += 1;

        emit voteCasted(voterId);
    }

    function voted(uint256 vId) public view restricted returns (bool) {
        return votersArray[vId].voted;
    }

    function votecountofparty(string memory partyname)
        public
        view
        restricted
        returns (uint256)
    {
        return partyArray[partyname].totalvote;
    }
}

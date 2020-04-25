

function maybeCheckMatch(lastTwoSources)
{

    if(lastTwoSources.length === 2)
    {
        return checkForMatch(lastTwoSources)
    }
    else
    {
        return null;
    }
}


function checkForMatch(lastTwoSources)
{
    const isMatch = lastTwoSources[0] === lastTwoSources[1];
    return isMatch;
}

export default maybeCheckMatch;
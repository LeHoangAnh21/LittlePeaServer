
async function checkInput(value)
{
    for(var i = 0; i < value.length; i++)
    {
        if(value[i] < 'a' || value[i] > 'z')
        {
            return false;
        }   
    }
    return true;
}

// function render
module.exports = {checkInput}
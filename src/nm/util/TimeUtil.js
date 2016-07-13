export default class TimeUtil
{
    static formatPlayTime(ms)
    {
        const s = Math.round(ms / 1000);
        const sec = s % 60;
        const min = (s - sec) / 60;
        return _digit2(min) + ":" + _digit2(sec);
    }
}

function _digit2(num)
{
    if (num >= 10)
    {
        return num;
    }
    else
    {
        return "0" + num;
    }
}

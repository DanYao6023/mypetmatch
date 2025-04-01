from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="宠物契合度预测AI服务")

# 配置CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 在生产环境中应该限制为特定域名
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "宠物契合度预测AI服务已启动"}

@app.post("/predict")
def predict_compatibility(data: dict):
    # 这里是一个简单的模拟预测
    # 实际应用中，您会使用训练好的ML模型
    user_lifestyle = data.get("lifestyle", 5)
    living_space = data.get("living_space", 5)
    time_available = data.get("time_available", 5)
    
    # 简单计算与不同宠物类型的契合度
    results = {
        "dog": min(100, (user_lifestyle + living_space + time_available) * 5),
        "cat": min(100, (10 - user_lifestyle + living_space + 10 - time_available) * 5),
        "fish": min(100, (10 - user_lifestyle + 5 + 10 - time_available) * 5),
        "bird": min(100, (user_lifestyle + 5 + time_available) * 5),
        "hamster": min(100, (5 + living_space + 10 - time_available) * 5)
    }
    
    return {
        "compatibility_scores": results,
        "best_match": max(results, key=results.get),
        "match_score": max(results.values())
    }